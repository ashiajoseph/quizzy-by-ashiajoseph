# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create destroy]
    resources :quizzes, except: %i[new edit]
    resources :questions, except: %i[new edit ]
    resources :options, only: %i[create ]
    resources :users, only: %i[create]
  end

  root "home#index"
  get "public/quiz/:slug", to: "quizzes#check_slug"
  get "*path", to: "home#index", via: :all

end
