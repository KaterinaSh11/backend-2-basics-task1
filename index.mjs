import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addNote, getNotes, removeNote } from './notes.controller.js';

yargs(hideBin(process.argv))
    .command(
        'add',
        'Добавить новую заметку в список',
        (yargs) => {
            return yargs.option('title', {
                describe: 'Note title',
                type: 'string',
                demandOption: true,
            });
        },
        async (argv) => {
            try {
                await addNote(argv.title);
                console.log('Заметка добавлена:', argv.title);
            } catch (error) {
                console.error('Ошибка добавления заметки:', error);
            }
        }
    )
    .command({
        command: 'list',
        describe: 'Показать все заметки',
        handler: async () => {
            const notes = await getNotes();

            if (notes.length === 0) {
                console.log('Заметок пока нет.');
                return;
            }

            console.log('Ваши заметки:');
            notes.forEach((note, index) => {
                console.log(`${index + 1}. ${note.title} (ID: ${note.id})`);
            });
        }
    })
    .command({
    command: 'remove',
    describe: 'Удалить заметку по ID',
    builder: {
        id: {
            describe: 'ID заметки',
            demandOption: true,
            type: 'string',
        }
    },
        handler: async (argv) => {
            await removeNote(argv.id);
        }
})
    .parse();
