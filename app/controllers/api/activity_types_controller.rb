class Api::ActivityTypesController < ApplicationController

  def index
    @activity_types = ActivityType.all

    if @activity_types
      render :index
    else
      render json: ["ActivityTypes resource unavailable"], status: 404
    end
  end

end
