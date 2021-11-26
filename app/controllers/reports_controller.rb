# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :export_download

  def generate_report
    quiz_list = @current_user.quizzes
    if quizList.size != 0
      @no_published_quiz_present = quiz_list.all? { |quiz| quiz.slug == nil }
      if !@no_published_quiz_present
        @report = Attempt.includes(:user, :quiz).where(submitted: true, quiz_id: @current_user.quizzes)
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

  def export_download
    job_id = params[:id]
    exported_file_name = "report_#{job_id}.xlsx"
    filename = "Report_#{DateTime.now.strftime("%Y%m%d_%H%M%S")}.xlsx"
    send_file Rails.root.join("tmp", exported_file_name), type: "application/xlsx", filename: filename
 end
end
