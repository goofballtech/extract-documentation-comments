#!/usr/bin/node
'use strict';
/**
# [extract-documentation-comments.js](source/main.js)
> Simply extract documentation comments from a source file.

Internal module name: `ExtractDocumentationComments`

Original Author: Anadian

Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

> The type notation used in this documentation is based off of the [Google Closure type system](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System).

> The status and feature lifecycle keywords used in this documentation are based off of my own standard [defined here](https://github.com/Anadian/FeatureLifeCycleStateStandard).
*/

//#Dependencies
	//##Internal
	//##Standard
	const FileSystem = require('fs');
	const Path = require('path')
	//##External
	const GetStream = require('get-stream');

//#Constants
const FILENAME = 'extract-documentation-comments.js';
const MODULE_NAME = 'ExtractDocumentationComments';
var PACKAGE_JSON = {};
var PROCESS_NAME = '';
/* istanbul ignore else */
if(require.main === module){
	PROCESS_NAME = 'extract-documentation-comments';
} else{
	PROCESS_NAME = process.argv0;
}
//##Errors

//#Global Variables
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
### main_Async (private)
> The main function when the script is run as an executable without the `--test` command-line option. Not exported and should never be manually called.

Parametres:
| name | type | description |
| --- | --- | --- |
| options | {?options} | An object representing the command-line options. \[default: {}\] |

*/
/* istanbul ignore next */
async function main_Async( options = {} ){
	const arguments_array = Array.from(arguments);
	let return_error = null;
	const FUNCTION_NAME = 'main_Async';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	let input_string = '';
	let output_string = '';
	//Parametre checks
	//Function
	///Input
	if( options.stdin === true ){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from STDIN.'});
		try{
			input_string = await GetStream( process.stdin, 'utf8' );
		} catch(error){
			return_error = new Error(`GetStream threw an error: ${error}`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	} else if( options.input != null ){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from a file.'});
		if( typeof(options.input) === 'string' ){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `options.input: '${options.input}'`});
			try{
				input_string = FileSystem.readFileSync( options.input, 'utf8' );
			} catch(error){
				return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		} else{
			return_error = new Error('"options.input" is not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	} else{
		return_error = new Error('No input options specified.');
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
	}
	///Transform
	if( return_error === null ){
		if( input_string !== '' && typeof(input_string) === 'string' ){
			try{
				output_string = getDocumentationStringFromSourceString( input_string, options );
			} catch(error){
				return_error = new Error(`getDocumentationStringFromSourceString threw an error: ${error}`);
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}
		} else{
			return_error = new Error('input_string is either null or not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	}
	///Output
	if( return_error === null ){
		if( output_string !== '' && typeof(output_string) === 'string' ){
			if( options.output != null && typeof(output_string) === 'string' ){
				try{
					FileSystem.writeFileSync( options.output, output_string, 'utf8' );
				} catch(error){
					return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
				}
			} else{
				if( options.stdout !== true ){
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No output options specified; defaulting to STDOUT.'});
				}
				console.log(output_string);
			}
		} else{
			return_error = new Error('"output_string" is either null or not a string.');
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		}
	}

	//Return
	if( return_error !== null ){
		process.exitCode = 1;
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: return_error.message});
	}
}

/**
### main_Async_Test (private)
> The main function when the script is run as an executable **with** the `--test` command-line option. Runs all of the other `*_Test()`-type unit-test functions in this module. Not exported and should never be manually called.

Parametres:
| name | type | description |
| --- | --- | --- |
| options | {?options} | An object representing the command-line options. \[default: {}\] |

*/
/* istanbul ignore next */
async function main_Async_Test(){
	const FUNCTION_NAME = 'main_Async_Test';
	//Variables
	var _return = false;
	var return_error = null;
	//Tests
  try {
    console.log('string');
    getDocumentationStringFromSourceString_Test();
    console.log('buffer');
		getDocumentationStringFromSourceBuffer_Test();
	} catch(error){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: `Test failed with error: '${error}'`});
		process.exitCode = 4;
	}
	//Return
	return _return;
}

//#Exports and Execution
/* istanbul ignore else */
if(require.main === module){
	var _return = [1,null];
	const FUNCTION_NAME = 'MainExecutionFunction';
	//##Dependencies
		//###Internal
		//###Standard
		const Path = require('path');
		//###External
		const MakeDir = require('make-dir');
		const ApplicationLogWinstonInterface = require('application-log-winston-interface');
		const EnvPaths = require('env-paths');
		const CommandLineArgs = require('command-line-args');
		const CommandLineUsage = require('command-line-usage');
	//Constants
	const EnvironmentPaths = EnvPaths( PROCESS_NAME );
	const OptionDefinitions = [
		//UI
		{ name: 'help', alias: 'h', type: Boolean, description: 'Writes this help text to STDOUT.' },
		{ name: 'noop', alias: 'n', type: Boolean, description: '[Reserved] Show what would be done without actually doing it.' },
		{ name: 'verbose', alias: 'v', type: Boolean, description: 'Verbose output to STDERR.' },
		{ name: 'version', alias: 'V', type: Boolean, description: 'Writes version information to STDOUT.' },
		{ name: 'no-quick-exit', alias: 'x', type: Boolean, description: 'Don\'t immediately exit after printing help, version, and/or config information.' },
		//Input
		{ name: 'stdin', alias: 'i', type: Boolean, description: 'Read input from STDIN.' },
		{ name: 'input', alias: 'I', type: String, description: 'The path to the file to read input from.' },
		{ name: 'test', alias: 't', type: Boolean, description: 'Run unit tests and exit.' },
		//Output
		{ name: 'stdout', alias: 'o', type: Boolean, description: 'Write output to STDOUT.' },
		{ name: 'output', alias: 'O', type: String, description: 'The name of the file to write output to.' },
		{ name: 'pasteboard', alias: 'p', type: Boolean, description: '[Reserved] Copy output to pasteboard (clipboard).' },
		//Config
		{ name: 'config', alias: 'c', type: Boolean, description: 'Print search paths and configuration values to STDOUT.' },
		{ name: 'config-file', alias: 'C', type: String, description: '[Reserved] Use the given config file instead of the default.' },
	];
	//Variables
	var function_return = [1,null];
	var quick_exit = false;
	var source_dirname = '';
	var parent_dirname = '';
	var package_path = '';
	//Logger
	try{ 
		MakeDir.sync( EnvironmentPaths.log );
	} catch(error)/* istanbul ignore next */{
		console.error('MakeDir.sync threw: %s', error);
	}
	function_return = ApplicationLogWinstonInterface.InitLogger('debug.log', EnvironmentPaths.log);
	if( function_return[0] === 0 ){
		setLogger( function_return[1] );
	}
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Start of execution block.'});
	//Options
	var Options = CommandLineArgs( OptionDefinitions );
	//Config
	/* istanbul ignore next */
	if( Options.verbose === true ){
		Logger.real_transports.console_stderr.level = 'debug';
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Logger: console_stderr transport log level set to: ${Logger.real_transports.console_stderr.level}`});
	}
	///Load package.json
	/* istanbul ignore next */
	try{
		source_dirname = Path.dirname( module.filename );
		package_path = Path.join( source_dirname, 'package.json' );
		PACKAGE_JSON = require(package_path);
	} catch(error){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `Soft error: ${error}`});
		try{
			parent_dirname = Path.dirname( source_dirname );
			package_path = Path.join( parent_dirname, 'package.json' );
			PACKAGE_JSON = require(package_path);
		} catch(error){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `Soft error: ${error}`});
		}
	}
	//Main
	/* istanbul ignore next */
	if( Options.version === true ){
		console.log(PACKAGE_JSON.version);
		quick_exit = true;
	}
	/* istanbul ignore next */
	if( Options.help === true ){
		const help_sections_array = [
			{
				header: 'extract-documentation-comments',
				content: 'Simply extract documentation comments from a source file.',
			},
			{
				header: 'Options',
				optionList: OptionDefinitions
			}
		]
		const help_message = CommandLineUsage(help_sections_array);
		console.log(help_message);
		quick_exit = true;
	}
	/* istanbul ignore next */
	if( Options.config === true ){
		console.log('Paths: ', EnvironmentPaths);
		quick_exit = true;
	}
	if( quick_exit === false || Options['no-quick-exit'] === true ){
		/* istanbul ignore else */
		if( Options.test === true ){
			main_Async_Test();
		} else{
			main_Async( Options );
		}
	}
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'End of execution block.'});
} else{
	exports.setLogger = setLogger;
	exports.getDocumentationStringFromSourceString = getDocumentationStringFromSourceString;
	exports.getDocumentationStringFromSourceBuffer = getDocumentationStringFromSourceBuffer;
}

