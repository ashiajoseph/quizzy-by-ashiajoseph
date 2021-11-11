# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create destroy]
    resources :quizzes, except: %i[new edit], param: :slug
    resources :questions, except: %i[new edit ]
    resources :options, only: %i[create index]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all

end
