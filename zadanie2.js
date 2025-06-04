const fs = require('fs');
const [,, command, filename, ...content] = process.argv;
const filePath = `./files/${filename}`;

switch (command) {
    case 'open':
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return console.error("Błąd odczytu pliku:", err.message);
            console.log(`Zawartość pliku ${filename}: ${data}`);
        });
        break;

    case 'append':
        const textToAppend = content.join(' ');
        fs.appendFile(filePath, textToAppend + '\n', (err) => {
            if (err) return console.error("Błąd dopisywania:", err.message);
            console.log(`Zapisałem do pliku ${filename}: ${textToAppend}`);
        });
        break;

    case 'delete':
        fs.unlink(filePath, (err) => {
            if (err) return console.error("Błąd usuwania:", err.message);
            console.log(`Usunąłem plik ${filename}`);
        });
        break;

    default:
        console.log("Wybierz: open, append, delete");
}
