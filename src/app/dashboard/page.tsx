"use client"
import Header from '@/components/r_dashboard/Header'
import NotesLayout from '@/components/r_dashboard/NotesLayout';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { FileText, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'


function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingNote, setEditingNote] = useState<Note | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    // Load notes from localStorage on initial render
    useEffect(() => {
        const savedNotes = localStorage.getItem("notes")
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes))
        }
    }, [])

    // Save notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const handleCreateNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            createdAt: Date.now()
        };
        setNotes([newNote, ...notes]);
        setIsFormOpen(false);
        setSelectedNoteId(newNote.id);
    }

    const handleSaveNote = (note: Note) => {
        const newNotes = [note, ...notes];
        setNotes(newNotes);
        setIsFormOpen(false);
        setSelectedNoteId(note.id);
    }

    const handleUpdateNote = (updatedNote: Note) => {
        setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
        setIsFormOpen(false);
        setEditingNote(null);
    }

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
        if (selectedNoteId === id) {
            setSelectedNoteId(null);
        }
    }

    const handleEditNote = (id: string) => {
        const noteToEdit = notes.find(note => note.id === id);
        if (noteToEdit) {
            setEditingNote(noteToEdit);
            setIsFormOpen(true);
        }
    }

    const filteredNotes = notes.filter(
        (note) =>
            note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

    return (
        <div className="w-full">
            <Header onNewNote={handleCreateNote} />
            <div className="w-full flex justify-center pt-8">

                <NotesLayout
                    notes={filteredNotes}
                    selectedNote={selectedNote}
                    editingNote={editingNote}
                    isFormOpen={isFormOpen}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelectNote={setSelectedNoteId}
                    onCreateNote={handleCreateNote}
                    onSaveNote={handleSaveNote}
                    onUpdateNote={handleUpdateNote}
                    onEditNote={handleEditNote}
                    onDeleteNote={handleDeleteNote}
                    onCancelForm={() => {
                        setIsFormOpen(false);
                        setEditingNote(null);
                    }}
                />

            </div>
        </div>
    )
}

export default Dashboard