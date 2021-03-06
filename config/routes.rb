Rails.application.routes.draw do

  # where the react lives
  root "static_pages#root"

  # single page api routes
  namespace :api, defaults: { format: :json } do

    # sessions need not be modified
    resource  :session, only: [:create, :destroy]

    # users cannot be deleted
    resources :users, only: [:create, :index, :update, :show] do
      # activities created and viewed in context of user
      resources :activities, only: [:index]
      # follows can only be handled in current_user
      resource :follow, only: [:create, :destroy]
    end


    # activities can be viewed collectively and destroyed w/o context
    resources :activities, only: [:create, :destroy, :index, :show, :update]

    # activity types needed for activity form
    resources :activity_types, only: [:index]

  end

end
