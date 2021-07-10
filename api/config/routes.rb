Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :notes
  delete '/notes/destroy_all', to: 'notes#destroy_all'
end
