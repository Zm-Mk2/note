# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
SAMPLE_NOTES = [
    {
        content: 'メモ1：メモアプリを作成する'
    },
    {
        content: 'メモ2：期限は3週間以内目標'
    },
    {
        content: 'メモ3：追加機能を検討する'
    }
]

SAMPLE_NOTES.each do |note|
    Note.create(note)
end