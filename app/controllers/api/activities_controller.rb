class Api::ActivitiesController < ApplicationController

  def create
    debugger
    @activity = Activity.new(activity_create_params)

    @activity.user = current_user
    
    # calculate distance, time if not given
    # TODO: code this
    @activity.distance = 5.5
    @activity.date = Time.now

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
    params.require(:activity).permit(:title, :description, :gpx, :activity_type_id)
  end

end
