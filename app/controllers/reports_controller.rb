# frozen_string_literal: true

class ReportsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[export export_status]

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
      status: job_status[:status],
      percentage: job_status[:pct_complete]
    }
  end
<<<<<<< ours
=======

  
>>>>>>> theirs
end
