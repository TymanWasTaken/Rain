import { Snowflake } from 'discord.js'

export type Perms = 'owner' | 'admin' | 'srMod' | 'moderator' | 'helper' | 'trialHelper' | 'none'
export type ModlogTypes = 'BAN' | 'UNBAN' | 'KICK' | 'MUTE' | 'UNMUTE' | 'WARN' | 'UNKNOWN'
export type Modlogs = {
	id: string
	type: ModlogTypes
	modID: Snowflake
	reason: string
	duration?: string
	createdTimestamp: number
	evidence?: string
}
export type guildCommandSettings = {
	id: string
	enabled: boolean
	lockedRoles: Perms
	lockedChannels: Snowflake[]
	data?: unknown
}
export type errorDetails = {
	type: string
	data: {
		note?: string
		link?: string
	}
}
export type chalkColors =
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'blackBright'
	| 'gray'
	| 'grey'
	| 'redBright'
	| 'greenBright'
	| 'yellowBright'
	| 'blueBright'
	| 'magentaBright'
	| 'cyanBright'
	| 'whiteBright'
	/* --- */
	| 'bgBlack'
	| 'bgRed'
	| 'bgGreen'
	| 'bgYellow'
	| 'bgBlue'
	| 'bgMagenta'
	| 'bgCyan'
	| 'bgWhite'
	| 'bgBlackBright'
	| 'bgGray'
	| 'bgGrey'
	| 'bgRedBright'
	| 'bgGreenBright'
	| 'bgYellowBright'
	| 'bgBlueBright'
	| 'bgMagentaBright'
	| 'bgCyanBright'
	| 'bgWhiteBright'
	/* --- */
	| 'bold'
	| 'dim'
	| 'italic'
	| 'underline'
	| 'overline'
	| 'inverse'
	| 'hidden'
	| 'strikethrough'
	| 'visible'

export type codeblockLangs =
	| '1c'
	| 'abnf'
	| 'accesslog'
	| 'actionscript'
	| 'ada'
	| 'arduino'
	| 'ino'
	| 'armasm'
	| 'arm'
	| 'avrasm'
	| 'actionscript'
	| 'as'
	| 'angelscript'
	| 'asc'
	| 'apache'
	| 'apacheconf'
	| 'applescript'
	| 'osascript'
	| 'arcade'
	| 'asciidoc'
	| 'adoc'
	| 'aspectj'
	| 'autohotkey'
	| 'autoit'
	| 'awk'
	| 'mawk'
	| 'nawk'
	| 'gawk'
	| 'bash'
	| 'sh'
	| 'zsh'
	| 'basic'
	| 'bnf'
	| 'brainfuck'
	| 'bf'
	| 'csharp'
	| 'cs'
	| 'c'
	| 'h'
	| 'cpp'
	| 'hpp'
	| 'cc'
	| 'hh'
	| 'c++'
	| 'h++'
	| 'cxx'
	| 'hxx'
	| 'cal'
	| 'cos'
	| 'cls'
	| 'cmake'
	| 'cmake.in'
	| 'coq'
	| 'csp'
	| 'css'
	| 'capnproto'
	| 'capnp'
	| 'clojure'
	| 'clj'
	| 'coffeescript'
	| 'coffee'
	| 'cson'
	| 'iced'
	| 'crmsh'
	| 'crm'
	| 'pcmk'
	| 'crystal'
	| 'cr'
	| 'd'
	| 'dns'
	| 'zone'
	| 'bind'
	| 'dos'
	| 'bat'
	| 'cmd'
	| 'dart'
	| 'dpr'
	| 'dfm'
	| 'pas'
	| 'pascal'
	| 'diff'
	| 'patch'
	| 'django'
	| 'jinja'
	| 'dockerfile'
	| 'docker'
	| 'dsconfig'
	| 'dts'
	| 'dust'
	| 'dst'
	| 'ebnf'
	| 'elixir'
	| 'elm'
	| 'erlang'
	| 'erl'
	| 'excel'
	| 'xls'
	| 'xlsx'
	| 'fsharp'
	| 'fs'
	| 'fix'
	| 'fortran'
	| 'f90'
	| 'f95'
	| 'gcode'
	| 'nc'
	| 'gams'
	| 'gms'
	| 'gauss'
	| 'gss'
	| 'gherkin'
	| 'go'
	| 'golang'
	| 'golo'
	| 'gololang'
	| 'gradle'
	| 'groovy'
	| 'xml'
	| 'html'
	| 'xhtml'
	| 'rss'
	| 'atom'
	| 'xjb'
	| 'xsd'
	| 'xsl'
	| 'plist'
	| 'svg'
	| 'http'
	| 'https'
	| 'haml'
	| 'handlebars'
	| 'hbs'
	| 'html.hbs'
	| 'html.handlebars'
	| 'haskell'
	| 'hs'
	| 'haxe'
	| 'hx'
	| 'hlsl'
	| 'hy'
	| 'hylang'
	| 'ini'
	| 'toml'
	| 'inform7'
	| 'i7'
	| 'irpf90'
	| 'json'
	| 'java'
	| 'jsp'
	| 'javascript'
	| 'js'
	| 'jsx'
	| 'julia'
	| 'julia-repl'
	| 'kotlin'
	| 'kt'
	| 'tex'
	| 'leaf'
	| 'lasso'
	| 'ls'
	| 'lassoscript'
	| 'less'
	| 'ldif'
	| 'lisp'
	| 'livecodeserver'
	| 'livescript'
	| 'ls'
	| 'lua'
	| 'makefile'
	| 'mk'
	| 'mak'
	| 'make'
	| 'markdown'
	| 'md'
	| 'mkdown'
	| 'mkd'
	| 'mathematica'
	| 'mma'
	| 'wl'
	| 'matlab'
	| 'maxima'
	| 'mel'
	| 'mercury'
	| 'mizar'
	| 'mojolicious'
	| 'monkey'
	| 'moonscript'
	| 'moon'
	| 'n1ql'
	| 'nsis'
	| 'nginx'
	| 'nginxconf'
	| 'nim'
	| 'nimrod'
	| 'nix'
	| 'ocaml'
	| 'ml'
	| 'objectivec'
	| 'mm'
	| 'objc'
	| 'obj-c'
	| 'obj-c++'
	| 'objective-c++'
	| 'glsl'
	| 'openscad'
	| 'scad'
	| 'ruleslanguage'
	| 'oxygene'
	| 'pf'
	| 'pf.conf'
	| 'php'
	| 'parser3'
	| 'perl'
	| 'pl'
	| 'pm'
	| 'plaintext'
	| 'txt'
	| 'text'
	| 'pony'
	| 'pgsql'
	| 'postgres'
	| 'postgresql'
	| 'powershell'
	| 'ps'
	| 'ps1'
	| 'processing'
	| 'prolog'
	| 'properties'
	| 'protobuf'
	| 'puppet'
	| 'pp'
	| 'python'
	| 'py'
	| 'gyp'
	| 'profile'
	| 'python-repl'
	| 'pycon'
	| 'k'
	| 'kdb'
	| 'qml'
	| 'r'
	| 'reasonml'
	| 're'
	| 'rib'
	| 'rsl'
	| 'graph'
	| 'instances'
	| 'ruby'
	| 'rb'
	| 'gemspec'
	| 'podspec'
	| 'thor'
	| 'irb'
	| 'rust'
	| 'rs'
	| 'SAS'
	| 'sas'
	| 'scss'
	| 'sql'
	| 'p21'
	| 'step'
	| 'stp'
	| 'scala'
	| 'scheme'
	| 'scilab'
	| 'sci'
	| 'shell'
	| 'console'
	| 'smali'
	| 'smalltalk'
	| 'st'
	| 'sml'
	| 'ml'
	| 'stan'
	| 'stanfuncs'
	| 'stata'
	| 'stylus'
	| 'styl'
	| 'subunit'
	| 'swift'
	| 'tcl'
	| 'tk'
	| 'tap'
	| 'thrift'
	| 'tp'
	| 'twig'
	| 'craftcms'
	| 'typescript'
	| 'ts'
	| 'vbnet'
	| 'vb'
	| 'vbscript'
	| 'vbs'
	| 'vhdl'
	| 'vala'
	| 'verilog'
	| 'v'
	| 'vim'
	| 'axapta'
	| 'x++'
	| 'x86asm'
	| 'xl'
	| 'tao'
	| 'xquery'
	| 'xpath'
	| 'xq'
	| 'yml'
	| 'yaml'
	| 'zephir'
	| 'zep'
