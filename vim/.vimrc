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
