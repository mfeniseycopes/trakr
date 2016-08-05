class Api::ActivityTypesController < ApplicationController

  def index
    @activity_types = ActivityType.all

    if @activity_types
      render json: @activity_types # no need for view (only 2 columns)
    else
      render json: ["ActivityTypes resource unavailable"], status: 404
    end
  end

end
