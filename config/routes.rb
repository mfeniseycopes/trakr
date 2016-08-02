Rails.application.routes.draw do

  root "static_pages#root"

  # single page api routes
  namespace :api, defaults: { format: :json } do
    :user, only: [:create]
  end

end
