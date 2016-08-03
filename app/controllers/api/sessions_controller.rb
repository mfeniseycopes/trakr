class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:email], params[:password])

    if @user
      login(@user)
      render "api/users/show"
    else
      render json: ["Invalid email/password combination"], status: 404
    end
  end

  def destroy
    @user = current_user

    if @user
      logout
      render "api/users/show"
    else
      render json: ["Cannot logout the void"], status: 401
    end

  end

end
