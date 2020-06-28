
/* istanbul ignore next */
//TODO: figure out why it's being set and immediatley overwritten
var Logger = { 
	log: () => {
		return null;
	}
};
/**
### setLogger
> Allows this module's functions to log the given logger object.

Parametres:
| name | type | description |
| --- | --- | --- |
| logger | {?object} | The logger to be used for logging or `null` to disable logging. |
*/
function setLogger( logger ){
	var return_error = null;
	//const FUNCTION_NAME = 'setLogger';
	//Variables
	//Parametre checks
	/* istanbul ignore else */
	if( typeof(logger) === 'object' ){
		/* istanbul ignore next */
		if( logger === null ){
			logger = { 
				log: () => {
					return null;
				}
			};
		}
	} else{
		return_error = new TypeError('Param "logger" is not an object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	Logger = logger;
	//Return
}
/**
### getDocumentationStringFromSourceString
> Returns a string containing only the contents of `\/** ... *\/` style documentation strings from the given source-file string.

Parametres:
| name | type | description |
| --- | --- | --- |
| source_string | {string} | The source file, as a string, to parse for `\/** ... *\/` style documentation strings. |
| options | {?object} | \[Reserved\] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | A string containing all of the documentation style comments, with the comment markers themselves remove, concatenated together. |
*/
function getDocumentationStringFromSourceString(source_string) {
  let arguments_array = Array.from(arguments);
  let _return, return_error;
  let regex = null;
  let matches_iterator = null;
  const FUNCTION_NAME = 'getDocumentationStringFromSourceString';
  Logger.log({
    process: PROCESS_NAME,
    module: MODULE_NAME,
    file: FILENAME,
    function: FUNCTION_NAME,
    level: 'debug',
    message: `received: ${arguments_array}`,
  });
  //Variables
  //Parametre checks
  if (typeof source_string !== 'string') {
    return_error = new TypeError('Param "source_string" is not string.');
    return_error.code = 'ERR_INVALID_ARG_TYPE';
    throw return_error;
  }
  //Function
  regex = new RegExp(/\/\*\*[\W\w\s\r\n*]*?\*\//, 'gs');
  matches_iterator = source_string.matchAll(regex);
  Logger.log({
    process: PROCESS_NAME,
    module: MODULE_NAME,
    file: FILENAME,
    function: FUNCTION_NAME,
    level: 'debug',
    message: `matches: ${matches_iterator}`,
  });
  _return = Array.from(matches_iterator)
    .join('\n')
    .replace(/\/\*\*|\*\/|(?:\r?\n|\r){2,}/g, '');

  //Return
  Logger.log({
    process: PROCESS_NAME,
    module: MODULE_NAME,
    file: FILENAME,
    function: FUNCTION_NAME,
    level: 'debug',
    message: `returned: ${_return}`,
  });
  return _return;
}

/**
### getDocumentationStringFromSourceBuffer
> Returns a string containing only the contents of `\/** ... *\/` style documentation strings from the given source-file buffer.

Parametres:
| name | type | description |
| --- | --- | --- |
| source_buffer | {Buffer} | The source file, as a Node Buffer, to parse for `\/** ... *\/` style documentation strings. |
| options | {?object} | \[Reserved\] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | A string containing all of the documentation style comments, with the comment markers themselves remove, concatenated together. |

*/
function getDocumentationStringFromSourceBuffer(source_buffer, options = {}) {
  let _return = '';
  let return_error;
  let buffer_string = '';
  const FUNCTION_NAME = 'getDocumentationStringFromSourceBuffer';
  Logger.log({
    process: PROCESS_NAME,
    module: MODULE_NAME,
    file: FILENAME,
    function: FUNCTION_NAME,
    level: 'debug',
    message: `received: ${arguments}`,
  });
  //Variables
  //Parametre checks
  if (Buffer.isBuffer(source_buffer) === false) {
    return_error = new TypeError('Param "source_buffer" is not Buffer.');
    return_error.code = 'ERR_INVALID_ARG_TYPE';
    Logger.log({
      process: PROCESS_NAME,
      module: MODULE_NAME,
      file: FILENAME,
      function: FUNCTION_NAME,
      level: 'error',
      message: `Throwing error: ${return_error}`,
    });
    throw return_error;
  }
  //Function
  buffer_string = source_buffer.toString('utf8');
  if (buffer_string) {
    /* istanbul ignore next */
    try {
      _return = getDocumentationStringFromSourceString(buffer_string, options);
    } catch (error) {
      Logger.log({
        process: PROCESS_NAME,
        module: MODULE_NAME,
        file: FILENAME,
        function: FUNCTION_NAME,
        level: 'error',
        message: `Received and throwing error: ${error}`,
      });
      throw error;
    }
  } else {
    return_error = new Error(
      `'source_buffer.toString()' returned an empty string or a non-string: ${buffer_string}`,
    );
    return_error.code = 'ERR_INVALID_RETURN_VALUE';
    Logger.log({
      process: PROCESS_NAME,
      module: MODULE_NAME,
      file: FILENAME,
      function: FUNCTION_NAME,
      level: 'error',
      message: `Throwing error: ${return_error}`,
    });
    throw return_error;
  }

  //Return
  Logger.log({
    process: PROCESS_NAME,
    module: MODULE_NAME,
    file: FILENAME,
    function: FUNCTION_NAME,
    level: 'debug',
    message: `returned: ${_return}`,
  });
  return _return;
}
