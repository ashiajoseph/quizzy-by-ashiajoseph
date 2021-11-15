# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    existing_user = User.find_by(email: user_params[:email].downcase)
    @eligible = true
    puts existing_user
    if existing_user && existing_user[:submitted]
      @eligible = false
    elsif existing_user && !existing_user[:submitted]

    else
      user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      unless user.save
        render status: :unprocessable_entity, json: { error: user.errors.full_messages.to_sentence }
        puts user.errors.full_messages.to_sentence
      end
      attempt = user.attempts.new({ quiz_id: params[:quiz_id] })
      unless attempt.save
        render status: :unprocessable_entity, json: { error: user.errors.full_messages.to_sentence }
      end
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
