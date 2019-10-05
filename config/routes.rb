Rails.application.routes.draw do
  namespace :api do
    get 'videos/index'
    get 'videos/show'
    get 'videos/create'
    get 'videos/update'
    get 'videos/destroy'
    get 'videos/skip--routes'
  end
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
