Rails.application.routes.draw do

  # where the react lives
  root "static_pages#root"

  # single page api routes
  namespace :api, defaults: { format: :json } do

    # sessions need not be modified
    resource  :session, only: [:create, :destroy]

    # users cannot be deleted
    resources :users, only: [:create, :update, :show] do
      # activities created and viewed in context of user
      resources :activities, only: [:create, :index]
    end

    # activities can be viewed collectively and destroyed w/o context
    resources :activities, only: [:destroy, :index, :show, :update]

  end

end
