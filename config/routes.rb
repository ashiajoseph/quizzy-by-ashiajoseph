# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create destroy]
    resources :quizzes, except: %i[new edit ]
    resources :questions, except: %i[new edit ]
    resources :options, only: %i[create ]
    resources :users, only: %i[create]
    resources :attempts, only: %i[index update]
    resources :attempts do
      collection do
        post "create_attempt_answers"
        get "retrieve_attempt_answers"
      end
    end
    get "public/quiz/:slug", to: "quizzes#check_slug"
    get "generate_report", to: "users#generate_report"
    get "/export" => "reports#export"
    get "/export_status/:id" => "reports#export_status"
  end

  get "/export_download/:id" => "reports#export_download"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
