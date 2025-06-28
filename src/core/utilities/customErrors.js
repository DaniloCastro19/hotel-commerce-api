import errorCustomizer from "../middlewares/errorCustomizer.js"


const BAD_REQUEST = (message) => {
    return errorCustomizer(400, message);
};


const ENTITY_NOT_FOUND = (entity) => {
    return errorCustomizer(404, `${entity} not found.`);
};

const DUPLICATED_ENTRY = (entity) => {
    return errorCustomizer(409, `${entity} has already been created.`);
};


export {BAD_REQUEST, ENTITY_NOT_FOUND, DUPLICATED_ENTRY};