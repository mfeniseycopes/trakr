class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all.limit(20)

    render :index
  end

  def show
    if params[:dashboard]
      @user = User.includes(:followee_activities).find_by(id: params[:id])
      render :dashboard if @user
    else
      @user = User.includes(:followers).find_by(id: params[:id])
      render :show if @user
    end

    if !@user
      render json: ["User does not exist."], status: 404
    end

  end

  def update
    @user = User.includes(:followers).find_by(id: params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:avatar, :first_name, :last_name, :email, :password, :bio, :location)
  end

end
