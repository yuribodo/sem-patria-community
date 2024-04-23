'use client'

import Header from '@/components/header'
import { Icons } from '@/components/icons'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { appRoutes } from '@/lib/constants'
import { type Category, type Course } from '@prisma/client'
import { useNewCourseForm } from './use-new-course-form'

type NewCourseFormProps = {
  initialData: Course | null
  categories: Category[]
}

export const NewCourseForm = ({
  initialData,
  categories
}: NewCourseFormProps) => {
  const {
    isAlertModalOpen,
    isDeleting,
    setIsAlertModalOpen,
    onDeleteCourse,
    router,
    title,
    isPending,
    form,
    onSubmit,
    action
  } = useNewCourseForm({ initialData })

  return (
    <>
      <AlertModal
        isOpen={isAlertModalOpen}
        description="Are you sure you want to delete this course?"
        loading={isDeleting}
        onClose={() => {
          setIsAlertModalOpen(false)
        }}
        onConfirm={async () => {
          await onDeleteCourse()
        }}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              router.push(appRoutes.admin_courses)
            }}
            className="flex items-center justify-center mr-4"
          >
            <Icons.arrowBack className="h-5 w-5" />
          </Button>

          <div className="flex items-center justify-between w-full">
            <Header title={title} />
            {initialData && (
              <Button
                disabled={isPending}
                variant="destructive"
                size="icon"
                onClick={() => {
                  setIsAlertModalOpen(true)
                }}
              >
                <Icons.trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Separator className="mb-6" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="name"
                        disabled={isPending}
                        placeholder="Course name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="courseUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="url"
                        disabled={isPending}
                        placeholder="Course Url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    {categories.length > 0 && (
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="category">
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem
                              data-testid={category.name}
                              key={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {!categories.length && (
                      <div className="flex flex-col gap-y-2">
                        <span className="text-muted-foreground font-medium text-sm">
                          You must create a category before create a course.
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-1/3"
                          onClick={() => {
                            router.push(appRoutes.admin_categories_new)
                          }}
                        >
                          Create category
                        </Button>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Levels</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="level">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a level"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem data-testid="beginner" value="beginner">
                          Beginner
                        </SelectItem>
                        <SelectItem
                          data-testid="intermediate"
                          value="intermediate"
                        >
                          Intermediate
                        </SelectItem>
                        <SelectItem data-testid="advanced" value="advanced">
                          Advanced
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPaid"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        data-testid="checkbox"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Paid</FormLabel>
                      <FormDescription>
                        Inform if this course is paid or not.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              data-testid="submit"
              disabled={isPending}
              className="ml-auto"
              type="submit"
            >
              {isPending && (
                <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
