# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :export_download

  def generate_report
    quizzes = @current_user.quizzes.order("created_at DESC")
    @content = false
    if quizzes.size != 0
      published_quiz_present = quizzes.all? { |quiz| quiz.slug == nil }
      if !published_quiz_present
        quizlist = quizzes.includes(:attempts, attempts: [:user])
        @content = true
        @report = User.report_data(quizlist)
      else
        render status: :not_found, json: { error: t("no_quiz", entity: "published") }
      end
    else
      render status: :not_found, json: { error: t("no_quiz", entity: "created") }
    end
  end

  def export
    job_id = ExportReportWorker.perform_async(@current_user.id)
    render json: {
      jid: job_id
    }
  end

  def export_status
    job_id = params[:id]
    job_status = Sidekiq::Status.get_all(job_id).symbolize_keys

    render json: {
      status: job_status[:status]
    }
  end
end
