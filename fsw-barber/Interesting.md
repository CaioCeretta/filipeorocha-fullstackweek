## Example 1

If we have, for example, a div which contains 3 elements, a h3, a p and a button, if the parent div is a flex of many of
these elements, it will try to keep them all at the same height, but if one of the child has a taller p than the others
it's going to make all the divs a little bit bigger for it to accomplish, but it will make the smaller one buttons to
not be on the same row, one thing we can do for this not to happen is to limit to one line the title of the barbershop,
by doing something like, if it exceeds one line, to put 3 dots onto it, by doing something like

<h3 className="font-semibold overflow-hidden text-nowrap text-ellipsis">{barbershop.name}</h3>, this will make the overflow
of the text to be hidden and the line to not wrap, making it occupy one line, and the text-ellipsis will create the 3 dots
for us, tailwind has a class which do these 3 things automatically, the truncate class

One thing other thing to know is that if the parent has, for example, 1000px width and the child has the outer div of its
component of 200px, if 10 elements inside that div render, it will cause the parent div to overflow
