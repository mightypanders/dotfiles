syntax on
set modelines=0
set number
set ruler
set visualbell
set textwidth=120
set cursorline
hi CursorLine term=bold cterm=bold ctermbg=darkgrey 
set tabstop=2
set shiftwidth=2
set matchpairs+=<:>
set showmode
set showcmd
set showmatch
set hlsearch
set ignorecase
set smartcase
set incsearch
set wrapscan
set scrolloff=999
set backspace=indent,eol,start
set mouse=nicr
"Leader
nnoremap <SPACE> <Nop>
let mapleader=" "
"mappings
map <leader>h :set cursorline!<CR>
xnoremap p "_dP
nnoremap <esc><esc> :noh<return><esc>

if has('nvim')
	call plug#begin(stdpath('data') . '/plugged')
		Plug 'junegunn/vim-easy-align'
		Plug 'morhetz/gruvbox'
		Plug 'Shougo/deoplete.nvim', {'do':':UpdateRemotePlugins'}
		Plug 'junegunn/fzf', {'do': {->fzf#install()}}
		Plug 'jiangmiao/auto-pairs'
		Plug 'machakann/vim-sandwich'
		Plug 'machakann/vim-highlightedyank'
		Plug 'bling/vim-airline'
		Plug 'airblade/vim-gitgutter'
		Plug 'rhysd/vim-clang-format'
		Plug 'easymotion/vim-easymotion'
	call plug#end()

	autocmd vimenter * colorscheme gruvbox
	let g:deoplete#enable_at_startup = 1
	let g:clang_format#auto_format=1
endif
