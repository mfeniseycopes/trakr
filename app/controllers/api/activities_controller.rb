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
    @activity = Activity.find(params[:id])

    if @activity.destroy
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def index
    if params[:user_id]
      @activities = Activitiy.find_by(user_id: params[:user_id])
    else
      @activities = Activity.all
    end

    render :index
  end

  def update
    @activity = Activity.find(params[:id])

    if @activity.update(activity_update_params)
      render :show
    else
      render json: @activity.errors.full_messages, status: 422
    end
  end

  def show
    @activity = Activity.find(params[:id])

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

end
