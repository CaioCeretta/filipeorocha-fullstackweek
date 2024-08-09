'use client'

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "./ui/form";
import { register } from "module";

interface SearchProps {
  search: string;
}

const searchFormSchema = z.object({
  search: z.string().trim().min(1, 'Type something to search')
})

type searchFormInputs = z.infer<typeof searchFormSchema>


const Search = () => {

  const form = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: ""
    }
  })

  const router = useRouter();

  const handleSearchSubmit = (data: searchFormInputs) => {
    router.push(`barbershops?search=${data.search}`)
  }


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSearchSubmit)} className="flex gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="w-full" placeholder="Search" {...form.register('search')} />
                </FormControl>

                <FormMessage />
              </FormItem>

            )}
          />

          <Button type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Form>

    </>
  );
}

export default Search;