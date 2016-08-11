class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new(follower_id: current_user.id, followee_id: params[:user_id])

    if @follow.save
      render :show
    else
      render json: ["Unable to follow"], status: 422
    end
  end

  def destroy
    @follow = current_user.out_follows.find_by(followee_id: params[:user_id])

    if @follow.destroy
      render :show
    else
      render json: ["Unable to unfollow"], status: 422
    end
  end

end
