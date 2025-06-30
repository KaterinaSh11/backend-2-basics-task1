import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db.json');

export async function getNotes() {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

export async function addNote(title) {
    const data = await fs.readFile(dbPath, 'utf-8');
    const notes = JSON.parse(data);

    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);
    await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
    console.log(chalk.yellow.inverse('Note added!'));

}

export async function updateNote(title) {
    const notes = await getNotes();

    console.log(chalk.yellow.inverse('Note updated!'));
    notes.forEach(note => {
        console.log(chalk.blue(note.title));
    })
}

export async function removeNote(id) {
    const notes = await getNotes();
    const filtered = notes.filter(note => note.id !== id);

    if (notes.length === filtered.length) {
        console.log(`Заметка с id "${id}" не найдена.`);
    } else {
        await fs.writeFile(dbPath, JSON.stringify(filtered, null, 2));
        console.log(`Заметка с id "${id}" удалена.`);
    }
}