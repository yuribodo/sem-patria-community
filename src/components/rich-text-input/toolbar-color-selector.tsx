import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { type Editor } from '@tiptap/core'

export interface BubbleColorMenuItem {
  name: string
  color: string
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)'
  },
  {
    name: 'Purple',
    color: '#9333EA'
  },
  {
    name: 'Red',
    color: '#E00000'
  },
  {
    name: 'Yellow',
    color: '#EAB308'
  },
  {
    name: 'Blue',
    color: '#2563EB'
  },
  {
    name: 'Green',
    color: '#008A00'
  },
  {
    name: 'Orange',
    color: '#FFA500'
  },
  {
    name: 'Pink',
    color: '#BA4081'
  },
  {
    name: 'Gray',
    color: '#A8A29E'
  }
]

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-highlight-default)'
  },
  {
    name: 'Purple',
    color: 'var(--novel-highlight-purple)'
  },
  {
    name: 'Red',
    color: 'var(--novel-highlight-red)'
  },
  {
    name: 'Yellow',
    color: 'var(--novel-highlight-yellow)'
  },
  {
    name: 'Blue',
    color: 'var(--novel-highlight-blue)'
  },
  {
    name: 'Green',
    color: 'var(--novel-highlight-green)'
  },
  {
    name: 'Orange',
    color: 'var(--novel-highlight-orange)'
  },
  {
    name: 'Pink',
    color: 'var(--novel-highlight-pink)'
  },
  {
    name: 'Gray',
    color: 'var(--novel-highlight-gray)'
  }
]

interface ColorSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editor: Editor | null
}

export const ToolbarColorSelector = ({
  open,
  onOpenChange,
  editor
}: ColorSelectorProps) => {
  if (!editor) return null
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  )

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  )

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2" variant="ghost">
          <span
            className="rounded-sm px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color
            }}
          >
            A
          </span>
          <Icons.arrowDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-800 scrollbar-thumb-rounded-sm"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <Button
              key={index}
              onClick={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor.chain().focus().setColor(color).run()
                onOpenChange(false)
              }}
              className="flex bg-transparent text-accent-foreground cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent w-full group"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium group-hover:bg-slate-950"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && (
                <Icons.checkSimple className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
        <div>
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Background
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <Button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' && editor.commands.setHighlight({ color })
                onOpenChange(false)
              }}
              className="flex cursor-pointer bg-transparent items-center justify-between px-2 py-1 text-sm text-accent-foreground hover:bg-accent w-full"
            >
              <div className="flex items-center gap-2">
                <div
                  className="rounded-sm border px-2 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Icons.checkSimple className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
