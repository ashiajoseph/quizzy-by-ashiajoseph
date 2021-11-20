# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: %i[create]

  def create
    @user = User.find_by(email: user_params[:email].downcase)
    @eligible = true
    if !@user
      @user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      unless @user.save
        render status: :unprocessable_entity, json: { error: @user.errors.full_messages.to_sentence }
        return
      end
      create_attempt

    else
      @attempt = @user.attempts.find_by(quiz_id: params[:quiz_id])
      if !@attempt
        create_attempt
      elsif @attempt[:submitted]
        @eligible = false
      end
    end
  end

  def generate_report
    quizzes = @current_user.quizzes.order("created_at DESC")
    @content = false
    if quizzes.size != 0
      published_quiz_present = quizzes.all? { |quiz| quiz.slug != nil }
      if published_quiz_present
        quizlist = quizzes.includes(:attempts, attempts: [:user])
        @report = [ ]
        @content = true
        quizlist.each do |quiz|
          quiz.attempts.each do |attempt|
            if attempt.submitted
              full_name = attempt.user.first_name + " " + attempt.user.last_name
              @report << {
                title: quiz.title, user_name: full_name, email: attempt.user.email,
                correct_count: attempt.correct_answers_count, incorrect_count: attempt.incorrect_answers_count
              }
            end
          end
        end
      else
        render status: :not_found, json: { error: t("no_quiz", entity: "published") }
      end
    else
      render status: :not_found, json: { error: t("no_quiz", entity: "created") }
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end

    def create_attempt
      @attempt = @user.attempts.new({ quiz_id: params[:quiz_id] })
      unless @attempt.save
        render status: :unprocessable_entity, json: { error: @user.errors.full_messages.to_sentence }
      end
    end
end
