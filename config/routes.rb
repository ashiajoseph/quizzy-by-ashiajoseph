# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, except: %i[new edit], param: :slug
    resources :questions, only: :create
    resources :options, only: :create
  end

  root "home#index"
  get "*path", to: "home#index", via: :all

end
