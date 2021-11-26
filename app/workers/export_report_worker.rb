# frozen_string_literal: true

class ExportReportWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker

  def perform (current_user_id)
    user = User.find_by_id(current_user_id)
    quizlist = user.quizzes.order("title ASC")
    report = Attempt.includes(:user, :quiz).where(submitted: true, quiz_id: user.quizzes)
    total report.size
    sleep 10
    xlsx_package = Axlsx::Package.new
    xlsx_workbook = xlsx_package.workbook
    xlsx_workbook.add_worksheet(name: "Report") do |worksheet|
    worksheet.add_row %w(Quiz User\ Name Email Correct\ Answer Incorrect\ Answer )
    report.each.with_index(1) do |attempt, idx|
      worksheet.add_row [ attempt.quiz.title,
         "#{attempt.user.first_name} #{attempt.user.last_name}",
          attempt.user.email,
          attempt.correct_answers_count,
          attempt.incorrect_answers_count]
      at idx
    end
  end
    xlsx_package.serialize Rails.root.join("tmp", "report_#{self.jid}.xlsx")
  end
end
