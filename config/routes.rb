Rails.application.routes.draw do

  root "static_pages#root"

  # single page api routes
  namespace :api, defaults: { format: :json } do
    resources :user, only: [:create]
    resource :session, only: [:create, :destroy]
  end

end
