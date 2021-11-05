# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: login_params[:email].downcase)
    unless @user.present? && @user.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: "Incorrect credentials, Try again." }
    end
  end

  def destroy
    @current_user = nil
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
