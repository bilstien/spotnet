"""
This module contains the API routes for the user.
"""
from fastapi import APIRouter,status, HTTPException
from loguru import logger
from app.crud.user import user_crud as crud_create_user
from app.crud.deposit import deposit_crud
from app.schemas.user import UserResponse, UserCreate, AddUserDepositRequest, AddUserDepositResponse

router = APIRouter()


@router.post(
    "/users", 
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    )

async def create_user(user: UserCreate)-> UserResponse:

    """
    Create a new user.

    Parameters:
    - wallet_id: str, the wallet ID of the user

    Returns:
    - UserResponse: The created user object
    """
    try:
        user = await crud_create_user.create_user(user.wallet_id)
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong.",
        ) from e
    return user


@router.post(
    "/add_user_deposit",
    status_code=status.HTTP_201_CREATED,
    response_model=AddUserDepositResponse,
)
async def add_user_deposit(user_deposit: AddUserDepositRequest):
    """
    Add an user deposit

    :param user_deposit: user id, amount, token, transaction_id
    :return: deposit id
    """
    try:
        deposit = await deposit_crud.create_deposit(
            user_id=user_deposit.user_id,
            token=user_deposit.token,
            amount=user_deposit.amount,
            transaction_id=user_deposit.transaction_id,
        )
        return AddUserDepositResponse(deposit_id=deposit.id)
    except Exception as e:
        logger.error(f"Error adding user deposit: {e}")
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail=str(e)) from e