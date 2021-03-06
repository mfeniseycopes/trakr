class Api::ActivitiesController < ApplicationController

  def create

    @activity = current_user.activities.new(activity_create_params)

    if @activity.save
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def destroy
    @activity = Activity.find_by(id: params[:id])

    if @activity.destroy
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def index

    if params[:user_id]
      @activities = Activity.where(user_id: params[:user_id]).order(date: :asc).limit(10)
    else
      @activities = Activity.all.limit(10)
    end

    render :index
  end

  def update
    @activity = Activity.find_by(id: params[:id])

    if @activity.update(activity_update_params)
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def show
    @activity = Activity.find_by(id: params[:id])

    if @activity
      render :show
    else
      render json: ["The requested activity does not exist."], status: 404
    end

  end

  def activity_create_params
    params.require(:activity).permit(
      :activity_type_id,
      :date,
      :description,
      :distance,
      :duration,
      :gpx,
      :encoded_polyline,
      {route: [:lat, :lng]},
      :title
    )
  end

  def activity_update_params
    params.require(:activity).permit(
      :activity_type_id,
      :date,
      :description,
      :duration,
      :title
    )
  end

end
