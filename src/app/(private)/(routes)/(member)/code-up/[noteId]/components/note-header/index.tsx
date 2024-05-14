'use client'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { type Note } from '@prisma/client'
import { useNoteHeader } from './use-note-header'

type NoteHeaderProps = {
  note: Note
  isPublicView?: boolean
}

export const NoteHeader = ({ note, isPublicView = false }: NoteHeaderProps) => {
  const {
    isPending,
    router,
    handleSaveChanges,
    isPublicNote,
    onChangeNoteVsibility
  } = useNoteHeader({ note })

  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="ghost"
        disabled={isPending}
        onClick={() => {
          router.back()
          router.refresh()
        }}
      >
        <Icons.arrowBack className="h-4 w-4 mr-2" />
        Back
      </Button>
      {!isPublicView && (
        <>
          <div className="flex items-center space-x-2">
            <Label htmlFor="note-visibility">
              Note visibilty:{' '}
              <span className="font-semibold">
                {isPublicNote ? 'Public' : 'Private'}
              </span>
            </Label>
            <Switch
              id="note-visibility"
              checked={isPublicNote}
              onCheckedChange={onChangeNoteVsibility}
            />
          </div>
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={handleSaveChanges}
          >
            {isPending && (
              <Icons.loader className="h-4 w-4 mr-2 animate-spin" />
            )}
            Save Changes
          </Button>
        </>
      )}
    </div>
  )
}
