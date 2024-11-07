const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  try {
    const { title, tags, body } = request.payload;
    console.log("Request payload:", request.payload); // Log the payload

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId: id,
        },
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    const response = h.response({
      status: "fail",
      message: "Invalid JSON data",
    });
    response.code(400);
    return response;
  }
};

module.exports = { addNoteHandler };
