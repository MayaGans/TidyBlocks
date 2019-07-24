# TidyBlocks Demo Script 2019-07

## Opening Slide

Hello, my name is Maya Gans
and I'm very excited to introduce TidyBlocks,
a new tool I've been developing as an intern with RStudio.

## AP Stats

If current trends continue,
more students will do AP Stats than AP Calculus in just five years.
Our goal is therefore to create a tool with which they can do
all of the questions on the AP Stats exam
using an interface they and their teachers will find familiar.

| Subject          |    2012 |    2017 |
|------------------|---------|---------|
| Calculus         | 361,000 | 316,000 |
| Statistics       | 153,000 | 215,000 |
| Computer Science |  26,100 |  44,000 |


## Block-based vs Text-based slide

Blocks based coding environments are a popular way to introduce programming to novices.
Instead of typing in code,
users click blocks together to create loops, conditionals, and expressions.

## Graph from Weintrop and Wilensky

Studies have shown that students are more successful and more interested in coding
when introduced through a block-based language like Scratch or Snap!
rather than a text-based language.
However,
it's much easier to express control flow with these tools than to manipulate data:
adding 1 to a variable requires several steps,
and there are no built-in capabilities for working with tabular data.

## Tidyverse vs TidyBlocks same operation

On the other hand,
R's tidyverse libraries provide a predictable, consistent grammar for doing these tasks.
Tables can be imported and transformed using verbs like filter, select, and summarize,
and functions can be strung together using pipes,
which users can think of as meaning "and then".
The aim of our project is to see how well this model can be captured in blocks,
and how easy it will be for novices to use.

## Open TidyBlocks

1.  This is what a first-time user sees when they open TidyBlocks.

2.  Navigating to a CSV data file on the web,
    we can import that data web into our application.

3.  When we run this single-block program
    it displays a data table
    so that we can inspect the imported file.

4.  The toolbox on the left is divided into categories,
    one of which contains dplyr functions.

5.  We can filter the dataset by adding a filter block to our pipeline.

6.  For complicated conditions,
    we can nest arguments using logic blocks to filter based on multiple arguments.

7.  Again,
    when we run our program we can see the transformation right away.

8.  To calculate aggregate statistics like averages,
    we first group by some variable.
    TidyBlocks automatically creates an indexing column in the dataset
    so that the user can see the groups and check that they are correct.

9.  We can then calculate statistics on each group
    like mean and standard deviation.

10. Other blocks let us select columns within our data
    or calculate new columns based on existing values.

## Refresh Page

1.  Once we have manipulated our data we can explore it visually
    using blocks with the ggplot syntax.
    After selecting our x and y variables,
    we can create a box and whisker plot...

2.  bar chart...

3.  or scatterplot.

4.  We can then add a regression line to our plot with a single click.

## Finale

A block-based tool for data science will give people a ramp they can walk up
rather than a cliff they have to climb.
We still have a lot of work to do---we want people to be able to join multiple tables together
and to view the R, Python, or JavaScript code corresponding to their blocks---so
if you would like to help,
we would like to hear from you.
All of our work is open source and hosted on GitHub,
and you can reach us at EMAIL.
