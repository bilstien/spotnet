use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use starknet::{ContractAddress, contract_address_const, get_contract_address};
use margin::interface::{IMarginDispatcher, IPragmaOracleDispatcher, IMockPragmaOracleDispatcher};
use snforge_std::cheatcodes::execution_info::caller_address::{
    start_cheat_caller_address, stop_cheat_caller_address,
};
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use alexandria_math::fast_power::fast_power;
use margin::types::{TokenAmount, Position};
use margin::constants::SCALE_NUMBER;
use margin::margin::{Margin, Margin::InternalTrait};
use super::constants::{contracts::EKUBO_CORE_SEPOLIA, tokens};
use ekubo::{interfaces::core::{ICoreDispatcher}};

#[derive(Drop)]
pub struct MarginTestSuite {
    pub margin: IMarginDispatcher,
    pub token: IERC20Dispatcher,
    pub owner: ContractAddress,
    pub pragma: IPragmaOracleDispatcher,
    pub pragma_mock: IMockPragmaOracleDispatcher,
}

pub fn ERC20_MOCK_CONTRACT() -> ContractAddress {
    contract_address_const::<'ERC20Mock'>()
}

pub fn ERC20_MOCK_CONTRACT_2() -> ContractAddress {
    contract_address_const::<'ERC20Mock2'>()
}

pub fn PRAGMA_MOCK_CONTRACT() -> ContractAddress {
    contract_address_const::<'PragmaMock'>()
}

pub fn deploy_erc20_mock(contract_address: ContractAddress, symbol: ByteArray) -> ContractAddress {
    let contract = declare("ERC20Mock").unwrap().contract_class();
    let name: ByteArray = "erc20 mock";
    let initial_supply: u256 = 100 * fast_power(10, 18);
    let recipient: ContractAddress = get_contract_address();

    let mut calldata: Array<felt252> = array![];
    Serde::serialize(@name, ref calldata);
    Serde::serialize(@symbol, ref calldata);
    Serde::serialize(@initial_supply, ref calldata);
    Serde::serialize(@recipient, ref calldata);

    let (contract_addr, _) = contract.deploy_at(@calldata, contract_address).unwrap();

    contract_addr
}

pub fn deploy_pragma_mock() -> ContractAddress {
    let contract = declare("PragmaMock").unwrap().contract_class();
    let mut calldata: Array<felt252> = array![];
    let (contract_addr, _) = contract.deploy_at(@calldata, PRAGMA_MOCK_CONTRACT()).unwrap();
    contract_addr
}

pub fn deploy_erc20_mock_2() -> ContractAddress {
    let contract = declare("ERC20Mock").unwrap().contract_class();
    let name: ByteArray = "erc20 mock";
    let symbol: ByteArray = "ERC20MOCK";
    let initial_supply: u256 = 100 * fast_power(10, 18);
    let recipient: ContractAddress = get_contract_address();

    let mut calldata: Array<felt252> = array![];
    Serde::serialize(@name, ref calldata);
    Serde::serialize(@symbol, ref calldata);
    Serde::serialize(@initial_supply, ref calldata);
    Serde::serialize(@recipient, ref calldata);

    let (contract_addr, _) = contract.deploy_at(@calldata, ERC20_MOCK_CONTRACT_2()).unwrap();

    contract_addr
}


pub fn setup_test_suite(
    owner: ContractAddress, token_address: ContractAddress, oracle_address: ContractAddress,
) -> MarginTestSuite {
    let contract = declare("Margin").unwrap().contract_class();
    let ekubo = ICoreDispatcher {
        contract_address: contract_address_const::<EKUBO_CORE_SEPOLIA>(),
    };

    let mut calldata: Array<felt252> = array![];
    Serde::serialize(@owner, ref calldata);
    Serde::serialize(@ekubo, ref calldata);
    Serde::serialize(@oracle_address, ref calldata);
    let (margin_contract, _) = contract.deploy(@calldata).unwrap();

    MarginTestSuite {
        margin: IMarginDispatcher { contract_address: margin_contract },
        token: IERC20Dispatcher { contract_address: token_address },
        pragma: IPragmaOracleDispatcher { contract_address: oracle_address },
        pragma_mock: IMockPragmaOracleDispatcher { contract_address: oracle_address },
        owner,
    }
}


pub fn setup_user(suite: @MarginTestSuite, user: ContractAddress, amount: u256) {
    // Transfer tokens to user
    (*suite.token).transfer(user, amount);

    start_cheat_caller_address(*suite.token.contract_address, user);
    (*suite.token).approve((*suite.margin).contract_address, amount);
    stop_cheat_caller_address(*suite.token.contract_address);
}

// Helper function to read treasury balances directly from storage
pub fn get_treasury_balance(
    margin_address: ContractAddress, depositor: ContractAddress, token: ContractAddress,
) -> TokenAmount {
    // Calculate storage address for treasury_balances
    // This depends on the exact storage layout in the contract
    let balance_key = snforge_std::map_entry_address(
        selector!("treasury_balances"), array![depositor.into(), token.into()].span(),
    );

    let balances = snforge_std::load(margin_address, balance_key, 1);
    let amount: TokenAmount = (*balances[0]).into();
    amount
}

// Helper function to read pool values directly from storage
pub fn get_pool_value(margin_address: ContractAddress, token: ContractAddress) -> TokenAmount {
    // Calculate storage address for pools
    let pool_key = snforge_std::map_entry_address(selector!("pools"), array![token.into()].span());

    let pool_value = snforge_std::load(margin_address, pool_key, 1);
    (*pool_value[0]).into()
}

// Helper function to store risk factor in storage
pub fn store_risk_factor(margin_address: ContractAddress, asset: ContractAddress, risk_factor: u128) {
    snforge_std::store(
        margin_address, selector!("risk_factors"), array![asset.into(), risk_factor.into()].span(),
    );
}

// Helper function to read risk factor from storage
pub fn get_risk_factor(margin_address: ContractAddress, asset: ContractAddress) -> u128 {
    let risk_factor_key = snforge_std::map_entry_address(
        selector!("risk_factors"), array![asset.into()].span(),
    );

    let risk_factor = snforge_std::load(margin_address, risk_factor_key, 1);
    (*risk_factor[0]).try_into().unwrap()
}


// Helper function to calculate health factor using test contract state
pub fn calculate_health_factor(suite: @MarginTestSuite, risk_factor: u128) -> u256 {
    let mut state = Margin::contract_state_for_testing();
    state.oracle_address.write((*suite.pragma.contract_address));
    let position_key = snforge_std::map_entry_address(
        selector!("positions"), array![(*suite.owner).into()].span(),
    ); 

    let position_array = snforge_std::load((*suite.margin.contract_address), position_key, 6);
    let position = Position{
        initial_token: (*position_array[0]).try_into().unwrap(),
        debt_token: (*position_array[1]).try_into().unwrap(),
        traded_amount: (*position_array[2]).into(),
        debt: (*position_array[3]).into(),
        is_open: (*position_array[4]).into() != 0,
        open_time: (*position_array[5]).try_into().unwrap(),
    };

    (position.traded_amount * state.get_data(position.initial_token).price.into() * SCALE_NUMBER * risk_factor.into())
    / (position.debt * state.get_data(position.debt_token).price.into() * SCALE_NUMBER)
}


pub fn store_position_data_for_health_factor(suite: @MarginTestSuite){
    let mut position_params = array![];

    Serde::serialize(@tokens::ETH, ref position_params);
    Serde::serialize(@tokens::USDC, ref position_params);
    Serde::serialize(@1000, ref position_params);
    Serde::serialize(@2000, ref position_params);
    Serde::serialize(@true, ref position_params);
    Serde::serialize(@1743790352, ref position_params);

    // Store position data in the contract's storage
    
    snforge_std::store(
        (*suite.margin.contract_address), 
        snforge_std::map_entry_address(
            selector!("positions"), array![(*suite.owner).into()].span()
        ), 
        position_params.span(),
    );
}