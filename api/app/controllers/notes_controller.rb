class NotesController < ApplicationController

    def index
        notes = Note.order(updated_at: :desc)
        render json: notes
    end

    def show
        note = Note.find(params[:id])
        render json: note
    end

    def create
        note = Note.new(note_params)
        if note.save
            render json: note
        else
            render json: note.errors, status: 422
        end
    end
    
    def update
        note = Note.find(params[:id])
        if note.update(note_params)
            render json: note
        else
            render json: note.errors, status: 422
        end
    end

    def destroy
        if Note.destroy(params[:id])
            head :no_content
        else
            render json: { error: "Failed to destroy" }, status: 422
        end        
    end

    def destroy_all
        if Note.destroy_all
            head :no_content
        else
            render json: { error: "Failed to destroy" }, status: 422
        end
    end

    private
    def note_params
        params.require(:note).permit(:content)
    end
    
end
