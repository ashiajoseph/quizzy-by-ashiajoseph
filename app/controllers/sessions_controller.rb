# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: login_params[:email].downcase)
    is_administrator = @user.present? && (@user.role == "administrator")
    if !@user.present? || !@user.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: t("session.incorrect_credentials") }
    else
      unless is_administrator
        render status: :unauthorized, json: { error: t("session.access_denied") }
      end
    end
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
