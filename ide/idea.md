
The keyboard shortcut `Ctrl+K` enables you to quickly invoke the `Commit Changes` dialog.
This dialog shows all modifications in project, gives summary information of file status and suggests improvements before check-in.


It is very easy to toggle between find and replace functionality.
When you perform search and replace in a file, pressing `Ctrl+F` shows the search pane. Pressing `Ctrl+R` adds field, where you can type the replace string.
While in the `Find in Path` dialog, you can switch to replace by pressing `Ctrl+Shift+R`. Same way, press `Ctrl+Shift+F` to hide the `Replace with` field, and switch to mere search.

If you are working on a large project, with numerous TODO items, filter them by scopes.
Use the Scope-Based tab in the TODO tool window to show only those items that pertain to the scope of interest.

`TODO` tool window lets you preview each of the encountered TODO items - just click the preview button on the toolbar.

If a method signature has been changed, IntelliJ IDEA highlights the tags that ran out of sync with the documentation comment and suggests a quick fix:

When working with a lengthy list of tasks, you don't need to delete them one by one. Select several tasks, using `Shift` or `Control/Command` keys, click the right arrow, and then click `Remove`.

If there are too many run/debug configurations of the same type, you can group them into folders, and thus distinguish them visually.

In the `Live Templates` settings, use speed search to find templates with certain text in the template abbreviation, body or description.
Start typing the desired text, and the list of available templates will shrink to show matching templates only:

You can avoid escaping backslashes in your regular expressions. Start typing a regular expression, then press `Alt+Enter` and choose `Edit RegExp`. The regular expression opens in a separate tab in the editor, where you can type backslashes as is.
All changes are synchronized with the original regular expression, and escapes are presented automatically. When ready, just press `Esc` to close the regular expression editor.

Speed up HTML, XML or CSS development with `Emmet`.
Enable this framework in the corresponding page of the `Editor | Emmet` node (`Settings/Preferences`):

To view which line separators style is used in the current file, look at the `Status Bar`:

You do not need to open a file in the editor to change its line separator style. Use the `Project tool window` instead: select one or more files, or folders, point to `File | Line Separators` on the main menu, and then choose the desired line ending style.
For a directory, new line separator applies recursively.

If you place the caret at certain symbol and press `Ctrl+Alt+Shift+T`, you will see the list of refactorings applicable to the current context.

You want your bookmarks and breakpoints to be always at hand, so that you can easily navigate through them?
They are visible in the `Favorites` tool window, which you can dock or float as required:

You can drag an external file from the Explorer or Finder, and drop it onto the `Favorites` tool window.

Tune the IntelliJ IDEA tool windows layout to make better use of your screen.
Toggle between the vertical and side-by-side placement of the tool windows by Ctrl+Click/Cmd+Click on the splitter:

You don't need to leave IntelliJ IDEA to work with your favorite shell. Just click the Terminal tool window button, and enjoy using the embedded local terminal.
 

 For the embedded local terminal, you can define your favorite shell, default tab name, and other settings. Choose File | Settings on the main menu, and then open the page Terminal.

 Enable the horizontal scrolling with the mouse wheel by holding the Shift key.

 IntelliJ IDEA allows you to search through the classes, files, tool windows, actions, settings, and symbols of your project by double pressing the Shift key.

 When using autopopup Code Completion, you can select the first item using Ctrl+句点. The selected name is automatically entered in the editor followed by dot.

 When an autopopup completion is active, Ctrl+向下箭头 and Ctrl+向上箭头 will close it and move the caret down or up in the editor.

 When in the Code Completion lookup, you can ease the search by filtering the list with the help of the "camel words" prefixes.

Pressing the same shortcut after you have invoked Smart-type Completion when there's an array of expected type in context will suggest to get an element from this array.

Pressing the same shortcut after you have invoked Smart-type Completion when a collection type is expected will search for arrays with same component type and suggest to convert them using Arrays.asList() call.

Pressing the same shortcut after you have invoked Smart-type Completion will search for chained expressions which have expected type.

When using Code Completion, you can accept the currently highlighted selection in the popup list with the Ctrl+Shift+Enter, IntelliJ IDEA will not just insert the selected string, but also will do its best to turn current code construct into syntactically correct one (balance parentheses, add missing braces and semicolons, etc.)