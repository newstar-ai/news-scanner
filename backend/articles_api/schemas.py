article_upload_schema = {
	"type": "object",
	"properties": {
		"article_info": {
			"properties": {
				"article_title": {"type": "string"},
				"article_author": {"type": "string"},
				"article_content": {"type": "string"},
				"article_url_local": {"type": "string"},
				"article_url_web": {"type": "string"}
			},
			"required": ["article_title", "article_content", "article_url_local", "article_url_web"],
			"additionalProperties": False
		},
		"publication_info": {
			"properties": {
				"publish_date": {"type": "string"},
				"page_num": {"type": "number"}
			},
			"required": ["publish_date", "page_num"],
			"additionalProperties": False
		},
		"newspaper_info": {
			"properties": {
				"newspaper_title": {"type": "string"},
			},
			"required": ["newspaper_title"],
			"additionalProperties": False
		}
	},
	"required": ["article_info", "publication_info", "newspaper_info"],
	"additionalProperties": False
}

article_update_schema = {
	"type": "object",
	"properties": {
		"title": {"type": "string"},
		"author": {"type": "string"},
		"content": {"type": "string"}
	},
	"required": ["title", "content"],
	"additionalProperties": False
}

article_search_title_schema = {
	"type": "object",
	"properties": {
		"title": {"type":"string"},
		"start_date": {"type":"string"},
		"end_date": {"type":"string"}
	},
	"required": ["title", "start_date", "end_date"],
	"additionalProperties": False
}

article_search_author_schema = {
	"type": "object",
	"properties": {
		"author": {"type":"string"},
		"start_date": {"type":"string"},
		"end_date": {"type":"string"}
	},
	"required": ["author", "start_date", "end_date"],
	"additionalProperties": False
}

article_search_content_schema = {
	"type": "object",
	"properties": {
		"content": {"type":"string"},
		"start_date": {"type":"string"},
		"end_date": {"type":"string"}
	},
	"required": ["content", "start_date", "end_date"],
	"additionalProperties": False
}