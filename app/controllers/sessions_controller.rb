# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: login_params[:email].downcase)
    isAdministrator = @user.present? && (@user.role == "administrator")
    puts isAdministrator
    if !@user.present? || !@user.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: t("session.incorrect_credentials") }
    else
      unless isAdministrator
        render status: :unauthorized, json: { error: t("session.access_denied") }
      end
    end
  end

  def destroy
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
