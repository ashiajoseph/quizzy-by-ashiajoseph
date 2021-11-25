# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resource :session, only: %i[create destroy]
    resources :quizzes, except: %i[new edit ]
    resources :quizzes do
      member do
        get "retrieve_title"
        put "publish"
        get "check_slug"
      end
    end
    resources :questions, except: %i[new edit ]
    resources :users, only: %i[create]
    resources :attempts, only: %i[index update]
    resources :attempts do
      collection do
        post "create_attempt_answers"
        get "retrieve_attempt_answers"
      end
    end
    resources :reports do
      collection do
        get "generate_report"
      end
    end
    # get "generate_report", to: "reports#generate_report"
    get "/export" => "reports#export"
    get "/export_status/:id" => "reports#export_status"
  end

  get "/export_download/:id" => "reports#export_download"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
