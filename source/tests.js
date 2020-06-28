/**
### getDocumentationStringFromSourceString_Test (private)
> Tests [getDocumentationStringFromSourceString](#getDocumentationStringFromSourceString); this function is not exported and should only be used internally by this module. 
 
Returns:
| type | description |
| --- | --- |
| {boolean} | Returns `true` if all tests pass successfully. |

Throws:
| code | type | condition |
| --- | --- | --- |
| any | {Error} | Thrown if a test fails. |

Status:
| version | change |
| --- | --- |
| 0.1.7 | Cleaned up. |
| 0.0.1 | Introduced |
*/
/* istanbul ignore next */
function getDocumentationStringFromSourceString_Test() {
  const FUNCTION_NAME = 'getDocumentationStringFromSourceString_Test';
  //Variables
  var _return = false;
  var return_error = null;
  var arg_test = false;
  var success_test = false;
  var sample_input_path = '';
  var sample_input_string = ''; //FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testInput.js')).toString()
  var expected_output_path = '';
  var expected_output_string = ''; //FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testOutput.txt')).toString()
  var actual_output_string = '';
  //Tests
  ///Invalid arg test
  try {
    getDocumentationStringFromSourceString({});
    arg_test = new Error(
      `Failure: invalid arg test: didn't throw an error when it received an invalid argument.`,
    );
    Logger.log({
      process: PROCESS_NAME,
      module: MODULE_NAME,
      file: FILENAME,
      function: FUNCTION_NAME,
      level: 'error',
      message: arg_test.message,
    });
  } catch (error) {
    if (error.code === 'ERR_INVALID_ARG_TYPE') {
      arg_test = true;
    } else {
      arg_test = error;
      Logger.log({
        process: PROCESS_NAME,
        module: MODULE_NAME,
        file: FILENAME,
        function: FUNCTION_NAME,
        level: 'error',
        message: `Failure: invalid arg test: received an unexpected error: ${error}\n`,
      });
    }
  }
  ///success test
  try {
    try {
      sample_input_path = Path.resolve(
        __dirname,
        '../test/example-source-file.js',
      );
    } catch (error) {
      return_error = new Error(`Path.resolve threw an error: ${error}`);
      throw return_error;
    }
    try {
      sample_input_string = FileSystem.readFileSync(sample_input_path, 'utf8');
    } catch (error) {
      return_error = new Error(
        `FileSystem.readFileSync threw an error: ${error}`,
      );
      throw return_error;
    }
    try {
      expected_output_path = Path.resolve(
        __dirname,
        '../test/example-source-file-output.txt',
      );
    } catch (error) {
      return_error = new Error(`Path.resolve threw an error: ${error}`);
      throw return_error;
    }
    try {
      expected_output_string = FileSystem.readFileSync(
        expected_output_path,
        'utf8',
      );
    } catch (error) {
      return_error = new Error(
        `FileSystem.readFileSync threw an error: ${error}`,
      );
      throw return_error;
    }
    actual_output_string = getDocumentationStringFromSourceString(
      sample_input_string,
    );
    if (actual_output_string === expected_output_string) {
      success_test = true;
    } else {
      success_test = new Error(
        `success test failed: actual output: '${actual_output_string}' didn't match expected output '${expected_output_string}'`,
      );
      Logger.log({
        process: PROCESS_NAME,
        module: MODULE_NAME,
        file: FILENAME,
        function: FUNCTION_NAME,
        level: 'error',
        message: success_test.message,
      });
    }
  } catch (error) {
    success_test = error;
    Logger.log({
      process: PROCESS_NAME,
      module: MODULE_NAME,
      file: FILENAME,
      function: FUNCTION_NAME,
      level: 'error',
      message: `Failure: success test caught an unexpected error: ${error}\n`,
    });
  }
  if (arg_test === true && success_test === true) {
    _return = true;
  } else {
    _return = false;
    return_error = new Error(
      `Test failed: invalid arg test: '${arg_test}' success test: '${success_test}'\n`,
    );
    throw return_error;
  }
  //Return
  return _return;
}


/**
### getDocumentationStringFromSourceBuffer_Test (private)
> Tests [getDocumentationStringFromSourceBuffer](#getDocumentationStringFromSourceBuffer); this function is not exported and should only be used internally by this module. 
 
Returns:
| type | description |
| --- | --- |
| {boolean} | Returns `true` if all tests pass successfully. |

Throws:
| code | type | condition |
| --- | --- | --- |
| any | {Error} | Thrown if a test fails. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
/* istanbul ignore next */
function getDocumentationStringFromSourceBuffer_Test(){
	const FUNCTION_NAME = 'getDocumentationStringFromSourceBuffer_Test';
	//Variables
	var _return = false;
	var return_error = null;
	var test_name = '';
	var arg_test = false;
	var null_buffer_test = false;
	var success_test = false;
	var input_buffer = null;
	var sample_input_path = '';
	var sample_input_buffer = null;
	var expected_output_path = '';
	var expected_output_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testOutput.txt'), 'utf8');
	var actual_output_string = '';
	//Tests
	test_name = 'invalid arg test';
	try{
		getDocumentationStringFromSourceBuffer( 'something' );
		arg_test = new Error(`Failure: ${test_name}: failed to return an error even when arguments were invalid.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_ARG_TYPE' ){
			arg_test = true;
			//console.log('arg_test passed.');
		} else{
			arg_test = new Error(`Failure: ${test_name}: received an unexpected error: '${error}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
		}
	}
	test_name = 'null buffer test';
	try{
		input_buffer = Buffer.from('', 'utf8');
		getDocumentationStringFromSourceBuffer( input_buffer );
		null_buffer_test = new Error(`Failure: ${test_name}: failed to return an error when sent an empty buffer.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_RETURN_VALUE' ){
			null_buffer_test = true;
			//console.log('null_buffer_test passed.');
		} else{
			null_buffer_test = new Error(`Failure: ${test_name}: received an unexpected error: ${error}`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
		}
	}
	test_name = 'success test';
	try {
		try{
			sample_input_path = Path.resolve( __dirname, '../test/example-source-file.js' );
		} catch(error){
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}
		try{
			sample_input_buffer = FileSystem.readFileSync( sample_input_path );
		} catch(error){
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}
		try{
			expected_output_path = Path.resolve( __dirname, '../test/example-source-file-output.txt' );
		} catch(error){
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}
		try{
			expected_output_string = FileSystem.readFileSync( expected_output_path, 'utf8' );
		} catch(error){
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}
		//input = new Buffer.from(FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testInput.js')), 'utf8')
		actual_output_string = getDocumentationStringFromSourceBuffer( sample_input_buffer );
		if( actual_output_string === expected_output_string ){
			success_test = true;
			//console.log('success_test passed');
		} else{
			success_test = new Error(`Failure: ${test_name}: actual output '${actual_output_string}' didn't match expected output '${expected_output_string}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
		}
	} catch(error){
		success_test = new Error(`Failure: ${test_name}: caught unexpected exception: ${error}`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
	}
	//Return
	if( (arg_test === true) && (null_buffer_test === true) && (success_test === true) ){
		_return = true;
	} else{
		return_error = new Error(`Test failed: invalid arg test: '${arg_test}' null buffer test: '${null_buffer_test}' success test: '${success_test}'`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		throw return_error;
	}
	return _return;
}
