# JQ学习笔记

|             | Javascript                    | JQ                                             |
| ----------- | ----------------------------- | ---------------------------------------------- |
| 结构体      | `body`                        | `.`                                            |
| 取值        | `body.data?.obj`              | `.data?.obj`                                   |
| 赋值        | `body.data.obj = {}`          | `.data.obj = {}`                               |
| 更新赋值    | `body.data = func(body.data)` | `.data |= func(.)`                             |
| 删除键      | `delete body.data.obj`        | `del(.data.obj)`                               |
| 引用变量    | `let data = body.data;`       | `.data as $data`                               |
| 条件判断    | if ... else if ... else ...   | if ... then ... elif ... then ... else ... end |
| 与或非      | `&&`, `||`, ` !`              | `and`, `or`, `| not`                           |
| 相等/不相等 | `===`, `!==`                  | `==`, `!=`                                     |
| 比较        | `>`, `>=`, `<=`, `<`          | `>`, `>=`, `<=`, `<`                           |
| 包含        | `includes`                    | `| contains`, `| IN`                           |
| 前缀匹配    | `startsWith`                  | `| startswith`                                 |
| 后缀匹配    | `endsWith`                    | `| endswith`                                   |
| 正则匹配    | `match`                       | `| match`                                      |
| 遍历        | `forEach`，`reduce`           | `foreach`, `reduce`                            |
| 遍历key     | Object.keys().forEach()       | `keys`, `keys_unsorted`                        |
| 遍历value   | Object.values().forEach()     | `map_values`                                   |
|             | Object.entries().forEach()    | `to_entries`                                   |
|             |                               | map                                            |
|             |                               | select                                         |
|             | filter                        | map(select)                                    |

几个样例：

一：

定义body.data为$data；

如果data中存在`"activity_tab"`, `"flash"`, `"operate"`这三个key，将对应的key赋值为null

如果data中存在`"feeds"`,过滤其中type不为15或30的项

```jq
.data as $data |
.data[("activity_tab", "flash", "operate") | select($data[.])] = null |
if .data.feeds
	then .data.feeds |= map(select(.type | IN(15, 30) | not))
end
```

二：

```jq
.result.modules |=
if .
then map(
	if (.style | startswith("tip")) or (.module_id | IN(241, 1283, 1441, 1284))
	then .items = []
	elif .style | startswith("banner")
	then .items |=
		if .
			then map(select(.link | contains("play")))
		else []
		end
	elif .style | startswith("function")
	then .items |=
		if .
			then map(select(.blink | startswith("bilibili")))
		else []
		end
	end)
end
```

三：

```jq
.data |=
(
	del(.play_together_info, .play_together_info_v2, .activity_banner_info) |
	if .function_card
		then .function_card[] = null
	end |
	if .new_tab_info.outer_list
		then .new_tab_info.outer_list |= map(select(.biz_id != 33))
	end |
	reduce (
        [["show_reserve_status"], false],
        [["reserve_info", "show_reserve_status"], false],
        [["shopping_info", "is_show"], 0]
    ) as [$path, $value]
	(.; if getpath($path) then setpath($path; $value) end)
)
```







